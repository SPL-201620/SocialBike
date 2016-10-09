package com.socialbike.be.users;

/**
 * Created by SAN on 8/10/2016.
 */
public class UserLoginRequest {
    private String email;
    private String password;


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
