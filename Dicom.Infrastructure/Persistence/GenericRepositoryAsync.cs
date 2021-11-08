using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Dicom.Entity;
using Microsoft.EntityFrameworkCore;

namespace Dicom.Infrastructure.Persistence
{
    public class GenericRepositoryAsync<TEntity> where TEntity : class, IEntity
    {
        internal Context context;
        internal DbSet<TEntity> dbSet;
        internal IUnitOfWork _unitOfWork;

        protected GenericRepositoryAsync() { }

        public GenericRepositoryAsync(Context context)
        {
            SetContext(context);
        }

        public void SetContext(Context context)   // a workaround for creating custom repos in DAL.cs
        {
            this.context = context;
            this.dbSet = context.Set<TEntity>();
        }


        public DbSet<TEntity> AllRecords => dbSet ??= context.Set<TEntity>();

        #region Get
        public virtual async Task<TEntity> GetByIDAsync(Guid id, QueryTrackingBehavior behavior = QueryTrackingBehavior.TrackAll)
        {
            return behavior == QueryTrackingBehavior.TrackAll
                ? await dbSet.FindAsync(id)
                : await dbSet.AsNoTracking().SingleOrDefaultAsync(ent => ent.Id == id);
        }

        public async Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> filter = null)
        {
            if (filter is null)
                filter = (x) => true;

            return await dbSet.FirstOrDefaultAsync(filter);
        }

        public async Task<TEntity> FirstAsync(Expression<Func<TEntity, bool>> filter = null)
        {
            if (filter is null)
                filter = (x) => true;

            return await dbSet.FirstAsync(filter);
        }

        public async Task<TEntity> SingleOrDefaultAsync(Expression<Func<TEntity, bool>> filter = null, QueryTrackingBehavior behavior = QueryTrackingBehavior.TrackAll)
        {
            if (filter is null)
                filter = (x) => true;

            if (behavior == QueryTrackingBehavior.TrackAll)
            {
                return await dbSet.SingleOrDefaultAsync(filter);
            }
            else
            {
                return await dbSet.AsNoTracking().SingleOrDefaultAsync(filter);
            }
        }




        public IQueryable<TEntity> GetAllQueryable()
        {
            var result = dbSet.AsQueryable();
            return result.AsQueryable();
        }

        public async Task<TEntity> GetSingleWithRelationsAsync(Expression<Func<TEntity, bool>> filter = null, string relations = "")
        {
            if (filter is null)
                filter = (x) => true;

            return await dbSet.Where(filter).Include(relations).FirstOrDefaultAsync();
        }

        public async Task<List<TEntity>> GetAllWithRelationsAsync(Expression<Func<TEntity, bool>> filter = null, string relation = "")
        {
            if (filter is null)
                filter = (x) => true;

            return await dbSet.Where(filter).Include(relation).ToListAsync();
        }

        public virtual IQueryable<TEntity> GetQuerable(Expression<Func<TEntity, bool>> filter = null)
        {
            IQueryable<TEntity> query = dbSet;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return query;
        }

        public virtual async Task<IEnumerable<TEntity>> GetAsync(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "", QueryTrackingBehavior behavior = QueryTrackingBehavior.TrackAll)
        {
            IQueryable<TEntity> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            if (behavior == QueryTrackingBehavior.TrackAll)
            {
                return await query.ToListAsync();
            }

            return await query.AsNoTracking().ToListAsync();
        }

        public async Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> filter = null)
        {
            if (filter != null)
                return await dbSet.Where(filter).ToListAsync();
            else
                return await dbSet.ToListAsync();
        }

        #endregion

        #region Update

        public Guid? Update(IEntity entity)
        {
            var updatedEntityId = dbSet.Update(entity as TEntity).Entity.Id;
            return updatedEntityId;
        }

        public virtual void DetachIfAlreadyAttached(TEntity entity)
        {
            var alreadyAttachedEntity = dbSet.Local.SingleOrDefault(e => e.Id == entity.Id);

            if (alreadyAttachedEntity != null)
            {
                context.Entry(alreadyAttachedEntity).State = EntityState.Detached;
            }
        }

        public virtual void Update(TEntity entityToUpdate)
        {
            DetachIfAlreadyAttached(entityToUpdate);
            dbSet.Attach(entityToUpdate);   // attach new entity
            context.Entry(entityToUpdate).State = EntityState.Modified;
        }

        #endregion

        #region Insert
        public async Task<Guid?> InsertAsync(TEntity entity)
        {
            var entityEntry = await dbSet.AddAsync(entity);

            if (entityEntry == null)
                throw new Exception("Failed to insert entity, dbSet.Add returned null");

            var newEntityId = entityEntry.Entity.Id;
            return newEntityId;
        }

        public async Task<Guid?> InsertAsync(IEntity entity)
        {
            var newEntity = await dbSet.AddAsync(entity as TEntity);

            return newEntity.Entity.Id;
        }

        public virtual void InsertAll(IEnumerable<TEntity> entities)
        {
            dbSet.AddRange(entities);
        }

        public bool Any(Expression<Func<TEntity, bool>> filter = null)
        {
            filter ??= (x) => true;

            return dbSet.AsNoTracking().Where(filter).Any();
        }


        public async Task InsertOrUpdateAsync<TEntity>(TEntity entity) where TEntity : IEntity
        {
            if (!Any(x => x.Id == entity.Id))
            {
                await InsertAsync(entity);
            }
            else
            {
                Update(entity);
            }
        }

        #endregion

        #region Delete

        public virtual async Task DeleteById(Guid id)
        {
            var entityToDelete = await dbSet.FindAsync(id);
            Delete(entityToDelete);
        }
        public virtual void Delete(TEntity entityToDelete)
        {
            if (context.Entry(entityToDelete).State == EntityState.Detached)
            {
                dbSet.Attach(entityToDelete);
            }
            dbSet.Remove(entityToDelete);
        }

        #endregion

        public async Task<int> SaveChangesAsync()
        {
            return await this.context.SaveChangesAsync();
        }
    }
}
