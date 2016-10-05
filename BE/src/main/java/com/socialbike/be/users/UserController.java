package com.socialbike.be.users;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by SAN on 12/09/2016.
 */
@RestController
@RequestMapping("/users")
public class UserController {

    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity addUser(@RequestBody AddUserRequest addUserRequest) {
        User user = new User();
        user.setFirebaseId(addUserRequest.getFirebaseId());
        user.setAge(addUserRequest.getAge());
        user.setDisplayName(addUserRequest.getDisplayName());
        user.setEmail(addUserRequest.getEmail());
        user.setPassword(addUserRequest.getPassword());
        user.setSex(addUserRequest.getSex());
        user.setPictureUrl(addUserRequest.getPictureUrl());
        userRepository.save(user);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{userId}")
    @ResponseStatus(value = HttpStatus.OK)
    public void updateUser(@RequestBody AddUserRequest addUserRequest, @PathVariable("userId") long userId) {
        User user = userRepository.findOne(userId);
        user.setFirebaseId(addUserRequest.getFirebaseId());
        user.setAge(addUserRequest.getAge());
        user.setDisplayName(addUserRequest.getDisplayName());
        user.setEmail(addUserRequest.getEmail());
        user.setPassword(addUserRequest.getPassword());
        user.setSex(addUserRequest.getSex());
        user.setPictureUrl(addUserRequest.getPictureUrl());
        userRepository.save(user);
    }
}
