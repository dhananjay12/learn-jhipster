package com.mynotes.demo.jhipster.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link com.mynotes.demo.jhipster.domain.Author} entity.
 */
public class AuthorDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String fname;

    @NotNull
    private String lname;

    @NotNull
    private String email;

    @NotNull
    private LocalDate birthDate;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AuthorDTO)) {
            return false;
        }

        return id != null && id.equals(((AuthorDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AuthorDTO{" +
            "id=" + getId() +
            ", fname='" + getFname() + "'" +
            ", lname='" + getLname() + "'" +
            ", email='" + getEmail() + "'" +
            ", birthDate='" + getBirthDate() + "'" +
            "}";
    }
}
