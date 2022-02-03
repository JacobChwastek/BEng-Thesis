using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Dicom.Entity;
using Microsoft.EntityFrameworkCore;

namespace Dicom.Infrastructure.Persistence
{
    public sealed class GenericRepositoryAsync<TEntity> where TEntity : class, IEntity
    {
        private Context _context;
        private DbSet<TEntity> _dbSet;
        internal IUnitOfWork _unitOfWork;

        private GenericRepositoryAsync()
        {
        }

        public GenericRepositoryAsync(Context context)
        {
            SetContext(context);
        }

        private void SetContext(Context context) // a workaround for creating custom repos in DAL.cs
        {
            _context = context;
            _dbSet = context.Set<TEntity>();
        }


        public DbSet<TEntity> AllRecords => _dbSet ??= _context.Set<TEntity>();

        #region Get

        public async Task<TEntity> GetByIDAsync(Guid id, QueryTrackingBehavior behavior = QueryTrackingBehavior.TrackAll)
        {
            return behavior == QueryTrackingBehavior.TrackAll
                ? await _dbSet.FindAsync(id)
                : await _dbSet.AsNoTracking().SingleOrDefaultAsync(ent => ent.Id == id);
        }

        public async Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> filter = null)
        {
            filter ??= (x) => true;

            return await _dbSet.FirstOrDefaultAsync(filter);
        }

        public async Task<TEntity> FirstAsync(Expression<Func<TEntity, bool>> filter = null)
        {
            filter ??= (x) => true;

            return await _dbSet.FirstAsync(filter);
        }

        public async Task<TEntity> SingleOrDefaultAsync(Expression<Func<TEntity, bool>> filter = null, QueryTrackingBehavior behavior = QueryTrackingBehavior.TrackAll)
        {
            filter ??= (x) => true;

            if (behavior == QueryTrackingBehavior.TrackAll)
            {
                return await _dbSet.SingleOrDefaultAsync(filter);
            }

            return await _dbSet.AsNoTracking().SingleOrDefaultAsync(filter);
        }


        public IQueryable<TEntity> GetAllQueryable()
        {
            var result = _dbSet.AsQueryable();
            return result.AsQueryable();
        }

        public async Task<TEntity> GetSingleWithRelationsAsync(Expression<Func<TEntity, bool>> filter = null, string relations = "")
        {
            filter ??= (x) => true;

            return await _dbSet.Where(filter).Include(relations).FirstOrDefaultAsync();
        }

        public async Task<List<TEntity>> GetAllWithRelationsAsync(Expression<Func<TEntity, bool>> filter = null, string relation = "")
        {
            filter ??= (x) => true;

            return await _dbSet.Where(filter).Include(relation).ToListAsync();
        }

        public IQueryable<TEntity> GetQuerable(Expression<Func<TEntity, bool>> filter = null)
        {
            IQueryable<TEntity> query = _dbSet;
            if (filter != null)
            {
                query = query.Where(filter);
            }

            return query;
        }

        public async Task<IEnumerable<TEntity>> GetAsync(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "", QueryTrackingBehavior behavior = QueryTrackingBehavior.TrackAll)
        {
            IQueryable<TEntity> query = _dbSet;

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
                return await _dbSet.Where(filter).ToListAsync();
            return await _dbSet.ToListAsync();
        }

        #endregion

        #region Update

        public Guid? Update(IEntity entity)
        {
            var updatedEntityId = _dbSet.Update(entity as TEntity).Entity.Id;
            return updatedEntityId;
        }

        public void DetachIfAlreadyAttached(TEntity entity)
        {
            var alreadyAttachedEntity = _dbSet.Local.SingleOrDefault(e => e.Id == entity.Id);

            if (alreadyAttachedEntity != null)
            {
                _context.Entry(alreadyAttachedEntity).State = EntityState.Detached;
            }
        }

        public void Update(TEntity entityToUpdate)
        {
            DetachIfAlreadyAttached(entityToUpdate);
            _dbSet.Attach(entityToUpdate); // attach new entity
            _context.Entry(entityToUpdate).State = EntityState.Modified;
        }

        #endregion

        #region Insert

        public async Task<Guid?> InsertAsync(TEntity entity)
        {
            var entityEntry = await _dbSet.AddAsync(entity);

            if (entityEntry == null)
                throw new Exception("Failed to insert entity, dbSet.Add returned null");

            var newEntityId = entityEntry.Entity.Id;
            return newEntityId;
        }

        public async Task<Guid?> InsertAsync(IEntity entity)
        {
            var newEntity = await _dbSet.AddAsync(entity as TEntity);

            return newEntity.Entity.Id;
        }

        public void InsertAll(IEnumerable<TEntity> entities)
        {
            _dbSet.AddRange(entities);
        }

        public bool Any(Expression<Func<TEntity, bool>> filter = null)
        {
            filter ??= (x) => true;

            return _dbSet.AsNoTracking().Where(filter).Any();
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

        public async Task DeleteById(Guid id)
        {
            var entityToDelete = await _dbSet.FindAsync(id);
            Delete(entityToDelete);
        }

        public void Delete(TEntity entityToDelete)
        {
            if (_context.Entry(entityToDelete).State == EntityState.Detached)
            {
                _dbSet.Attach(entityToDelete);
            }

            _dbSet.Remove(entityToDelete);
        }

        #endregion

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}