package com.socialbike.repository;

import com.socialbike.entity.User;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Created by SAN on 23/08/2016.
 */
@RepositoryRestResource(collectionResourceRel = "users", path="users")
public interface UserRepository extends PagingAndSortingRepository<User, Long>{
    List<User> findByFirebaseId(@Param("firebaseId") String firebaseId);
}
