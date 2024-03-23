package com.zpo.studentsystem.service;

import com.zpo.studentsystem.model.Generator;
import com.zpo.studentsystem.repository.GeneratorRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Service class for the Generator entity.
 * Contains methods for adding, deleting and getting students.
 */
@Service
@Transactional
public class GeneratorService {

    @Autowired
    private GeneratorRepository generatorRepo;

    public List<Generator> getGenerators() {
        return generatorRepo.findAll();
    }

    public Generator addGenerator(String name) {
        Generator generator = new Generator();
        generator.setName(name);
        return generatorRepo.save(generator);
    }

    public Boolean deleteGenerator(Long index) {
        if(getGenerator(index) == null) return false;
        generatorRepo.deleteById(index);
        return true;
    }

    public Generator getGenerator(Long index) {
        return generatorRepo.findById(index).orElseThrow(
                () -> new EntityNotFoundException("Generator not found with id " + index)
        );
    }
}
