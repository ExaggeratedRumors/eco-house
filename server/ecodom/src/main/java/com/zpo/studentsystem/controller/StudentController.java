package com.zpo.studentsystem.controller;

import com.zpo.studentsystem.config.Utils;
import com.zpo.studentsystem.model.Generator;
import com.zpo.studentsystem.model.House;
import com.zpo.studentsystem.model.Device;
import com.zpo.studentsystem.service.GeneratorService;
import com.zpo.studentsystem.service.HouseService;
import com.zpo.studentsystem.service.DeviceService;
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
 * Controller for the Generator entity.
 * Contains methods for handling HTTP requests related to students.
 */
@Controller
public class StudentController {
    @Autowired
    GeneratorService generatorService;

    @Autowired
    DeviceService deviceService;

    @Autowired
    HouseService houseService;

    /**
     * Request GET for page of students list.
     * @param model model of html template.
     * @return name of html file.
     */
    @RequestMapping("/students")
    public String getStudents(Model model) {
        List<Generator> generators = generatorService.getGenerators();
        model.addAttribute("students", generators);
        return "generators.html";
    }

    /**
     * Request POST to add another student.
     * @param name student's name.
     * @return student as object who has been added to database with the response code.
     */
    @PostMapping("/students/add/{name}")
    public ResponseEntity<Generator> addStudent(@PathVariable String name) {
        if(Utils.DEBUG) System.out.println("Adding student \"" + name + "\"");
        Generator result = generatorService.addGenerator(name);
        if(result == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        if(Utils.DEBUG) System.out.println("Generator added with id " + result.getGeneratorId());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /**
     * Request DELETE to remove student from data base.
     * @param index student's index number;
     * @return response code - 404 or 200.
     */
    @DeleteMapping("/students/delete/{index}")
    public ResponseEntity<Long> deleteStudent(@PathVariable Long index) {
        if(Utils.DEBUG) System.out.println("Deleting student with id " + index);
        Boolean result = generatorService.deleteGenerator(index);
        if(!result) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        if(Utils.DEBUG) System.out.println("Generator deleted");
        return new ResponseEntity<>(index, HttpStatus.OK);
    }

    /**
     * Request GET to get every student's grades.
     * @param index student's index number;
     * @return name of html file.
     */
    @RequestMapping("/students/grades/{index}")
    public String getGrades(@PathVariable Long index, Model model) {
        List<Device> devices = deviceService.getDevices();
        if(Utils.DEBUG)
            devices.forEach(device -> System.out.println("test " + device.getPowerConsumptionPerHour()));
        List<House> houses = houseService.getHouses();
        model.addAttribute("grades", devices);
        model.addAttribute("courses", houses);
        model.addAttribute("index", index);
        return "devices.html";
    }
}
