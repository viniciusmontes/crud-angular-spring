package com.vinicius.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vinicius.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long>{
    
}
