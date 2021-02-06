package com.mynotes.demo.jhipster;

import com.mynotes.demo.jhipster.Gateway123App;
import com.mynotes.demo.jhipster.config.TestSecurityConfiguration;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(classes = { Gateway123App.class, TestSecurityConfiguration.class })
public @interface IntegrationTest {
}
