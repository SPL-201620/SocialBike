package com.socialbike.be.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by SAN on 12/09/2016.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}
