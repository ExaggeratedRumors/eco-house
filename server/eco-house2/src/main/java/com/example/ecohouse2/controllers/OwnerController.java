package com.example.ecohouse2.controllers;

import com.example.ecohouse2.Owner;
import com.example.ecohouse2.services.DeviceService;
import com.example.ecohouse2.services.GeneratorService;
import com.example.ecohouse2.services.HouseService;
import com.example.ecohouse2.services.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * Controller for the House entity.
 * Contains methods for handling HTTP requests related to courses.
 */
@Controller
public class OwnerController {

    @Autowired
    OwnerService ownerService;

    @Autowired
    HouseService houseService;

    @Autowired
    GeneratorService generatorService;

    @Autowired
    DeviceService deviceService;

    @RequestMapping("/owners")
    public String getUsers(Model model) {
        List<Owner> owners = ownerService.getUsers();
        //model.addAttribute("courses", houses);
        return "owners.html";
    }

    @PostMapping("/owners/add/{name}/{email}/{password}")
    public ResponseEntity<Owner> addOwner(@PathVariable String name, @PathVariable String email, @PathVariable String password) {
        System.out.println("Adding owner \"" + name+"\"");
        Owner result = ownerService.addUser(name, email, password);
        if(result == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        System.out.println("Owner added with id " + result.getId());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/owners/delete/{id}")
    public ResponseEntity<Long> deleteOwner(@PathVariable Long id) {
        System.out.println("Deleting owner with id " + id);
        Boolean result = ownerService.deleteUser(id);
        if(!result)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        System.out.println("Owner deleted");
        return new ResponseEntity<>(id, HttpStatus.OK);
    }


}
