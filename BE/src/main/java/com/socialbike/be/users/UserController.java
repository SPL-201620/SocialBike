package com.socialbike.be.users;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
    public List<User> findAllUsers(){
        return userRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public void addUser(@RequestBody AddUserRequest addUserRequest){
        User user = new User();
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
