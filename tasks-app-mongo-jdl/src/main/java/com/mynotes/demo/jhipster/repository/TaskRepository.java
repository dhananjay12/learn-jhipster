package com.mynotes.demo.jhipster.repository;

import com.mynotes.demo.jhipster.domain.Task;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Task entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
}
