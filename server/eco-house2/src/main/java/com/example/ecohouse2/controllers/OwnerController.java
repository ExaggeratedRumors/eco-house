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
import org.springframework.web.bind.annotation.*;
import com.example.ecohouse2.dto.OwnerRequest;
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

    @CrossOrigin
    @RequestMapping("/owners")
    public String getUsers(Model model) {
        List<Owner> owners = ownerService.getUsers();
        //model.addAttribute("courses", houses);
        return "owners.html";
    }

    @CrossOrigin
    @PostMapping("/owners/add")
    public ResponseEntity<Owner> addOwner(@RequestBody OwnerRequest ownerRequest) {
        System.out.println("Adding owner \"" + ownerRequest.getName()+"\"");
        Owner result = ownerService.addOwner(ownerRequest.toOwner());
        if(result == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        System.out.println("Owner added with id " + result.getOwner_id());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/owners/{id}")
    public ResponseEntity<Owner> getOwner(@PathVariable Long id) {
        System.out.println("Getting owner with id " + id);
        Owner result = ownerService.getOwner(id);
        System.out.println("Owner found");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @CrossOrigin
    @DeleteMapping("/owners/remove/{id}")
    public ResponseEntity<Long> deleteOwner(@PathVariable Long id) {
        System.out.println("Deleting owner with id " + id);
        Boolean result = ownerService.deleteOwner(id);
        if(!result)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        System.out.println("Owner deleted");
        return new ResponseEntity<>(id, HttpStatus.OK);
    }


}
