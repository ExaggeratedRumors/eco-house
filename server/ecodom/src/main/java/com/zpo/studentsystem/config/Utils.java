package com.zpo.studentsystem.config;

import lombok.Getter;
import lombok.SneakyThrows;
import org.yaml.snakeyaml.Yaml;
import java.io.InputStream;
import java.util.LinkedHashMap;

/**
 * Class aggregating loading configuration files.
 * Contains debug flag and grade thresholds.
 */
public class Utils {
    static public Boolean DEBUG;

    @Getter
    static LinkedHashMap<Double, Double> grades;
    static {
        DEBUG = true;
        String gradesSourcePath = "/grades.yaml";
        grades = readGradesFromYaml(gradesSourcePath);
    }

    /**
     * Method loading grades from YAML file.
     * @param sourcePath String of path to file location.
     * @return Loaded object.
     */
    @SneakyThrows
    public static LinkedHashMap<Double, Double> readGradesFromYaml(String sourcePath) {
        InputStream resource = Utils.class.getResourceAsStream(sourcePath);
        Yaml yaml = new Yaml();
        return yaml.load(resource);
    }
}