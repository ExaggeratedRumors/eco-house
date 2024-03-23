package com.zpo.studentsystem.controller;

import com.zpo.studentsystem.model.Device;
import com.zpo.studentsystem.model.House;
import com.zpo.studentsystem.model.Generator;
import com.zpo.studentsystem.service.GeneratorService;
import com.zpo.studentsystem.service.HouseService;
import com.zpo.studentsystem.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * Controller for the main page of the application.
 * Contains methods for handling HTTP requests related to the root of the application.
 */
@Controller
public class RootController {
    @Autowired
    HouseService houseService;

    @Autowired
    GeneratorService generatorService;

    @Autowired
    DeviceService deviceService;

    /**
     * Method for viewing the main page of the application.
     * @param model model of html template.
     * @return name of html file.
     */
    @RequestMapping("/")
    public String getCourses(Model model) {
        List<House> houses = houseService.getHouses();
        model.addAttribute("houses", houses);
        List<Generator> generators = generatorService.getGenerators();
        model.addAttribute("generators", generators);
        List<Device> devices = deviceService.getDevices();
        model.addAttribute("devies", devices);
        return "index.html";
    }
}
