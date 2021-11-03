using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Dicom.Entity;
using Microsoft.EntityFrameworkCore;

namespace Dicom.Infrastructure.Persistence
{
    public class GenericRepository<TEntity> where TEntity : class, IEntity
    {
        internal Context context;
        internal DbSet<TEntity> dbSet;

        public GenericRepository(Context context)
        {
            this.context = context;
            this.dbSet = context.Set<TEntity>();
        }

        public DbSet<TEntity> AllRecords => dbSet; // enables linq selects (views)
        public bool Any(Expression<Func<TEntity, bool>> filter = null)
        {
            filter ??= (x) => true;

            return dbSet.Any(filter);
        }

        public virtual void Delete(object id)
        {
            var entityToDelete = dbSet.Find(id);
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

        public virtual void DetachIfAlreadyAttached(TEntity entity)
        {
            var alreadyAttachedEntity = dbSet.Local.FirstOrDefault(e => e.Id == entity.Id);

            if (alreadyAttachedEntity != null)
            {
                context.Entry(alreadyAttachedEntity).State = EntityState.Detached; // if other istance of this entity is already attached, detach it
            }
        }

        public TEntity First(Expression<Func<TEntity, bool>> filter = null)
        {
            filter ??= (x) => true;

            return dbSet.First(filter);
        }

        public TEntity FirstOrDefault(Expression<Func<TEntity, bool>> filter = null)
        {
            filter ??= (x) => true;

            return dbSet.FirstOrDefault(filter);
        }

        public TEntity GetSingleWithRelations(Expression<Func<TEntity, bool>> filter = null, string relations = "")
        {
            filter ??= (x) => true;

            return dbSet.Where(filter).Include(relations).FirstOrDefault();
        }

        public virtual IEnumerable<TEntity> Get(
                                                                    Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<TEntity> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            query = includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries).Aggregate(query, (current, includeProperty) => current.Include(includeProperty));

            return orderBy != null ? orderBy(query).ToList() : query.ToList();
        }

        public List<TEntity> GetAll() => dbSet.ToList();


        public virtual TEntity GetByID(Guid id, QueryTrackingBehavior behavior = QueryTrackingBehavior.TrackAll)
        {
            return behavior == QueryTrackingBehavior.TrackAll
                ? dbSet.Find(id)
                : dbSet.AsNoTracking().SingleOrDefault(ent => ent.Id == id);
        }

        public Guid? Insert(TEntity entity)
        {
            var newEntityId = dbSet.Add(entity).Entity.Id;
            return newEntityId;
        }

        public virtual void InsertAll(IEnumerable<TEntity> entities)
        {
            dbSet.AddRange(entities);
        }

        public int SaveChanges()
        {
            return context.SaveChanges();
        }
        public virtual void Update(TEntity entityToUpdate)
        {
            DetachIfAlreadyAttached(entityToUpdate);
            dbSet.Attach(entityToUpdate);   // attach new entity
            context.Entry(entityToUpdate).State = EntityState.Modified;
        }

        public void InsertOrUpdate(TEntity entity)
        {
            if (!Any(x => x.Id == entity.Id))
            {
                Insert(entity);
            }
            else
            {
                Update(entity);
            }
        }

        public void SetTrackingBehaviour(QueryTrackingBehavior behavior)
        {
            context.ChangeTracker.QueryTrackingBehavior = behavior;
        }
    }
}
