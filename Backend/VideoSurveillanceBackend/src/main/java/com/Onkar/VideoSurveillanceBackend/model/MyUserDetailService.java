package com.Onkar.VideoSurveillanceBackend.model;

import com.Onkar.VideoSurveillanceBackend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailService implements UserDetailsService {


    @Autowired
    private UserRepo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

       Optional<User> user = repo.findByUsername(username);
       if(user.isPresent()){
//           Here i use User Adi use var
           User obj = user.get();
          return  org.springframework.security.core.userdetails.User.builder()
                  .username(obj.getUsername())
                  .password(obj.getPassword())
                  .roles(obj.getRole())
                  .build();
       }else {
           throw new UsernameNotFoundException(username);
       }
    }
}
