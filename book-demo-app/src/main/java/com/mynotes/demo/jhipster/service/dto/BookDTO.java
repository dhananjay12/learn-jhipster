package com.mynotes.demo.jhipster.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link com.mynotes.demo.jhipster.domain.Book} entity.
 */
public class BookDTO implements Serializable {
    
    private Long id;

    @NotNull
    @Size(min = 2)
    private String title;

    @NotNull
    @Size(min = 5)
    private String description;

    @NotNull
    private LocalDate publicationDate;

    @NotNull
    private Double price;


    private Long authorId;

    private String authorLname;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(LocalDate publicationDate) {
        this.publicationDate = publicationDate;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public String getAuthorLname() {
        return authorLname;
    }

    public void setAuthorLname(String authorLname) {
        this.authorLname = authorLname;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BookDTO)) {
            return false;
        }

        return id != null && id.equals(((BookDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BookDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", publicationDate='" + getPublicationDate() + "'" +
            ", price=" + getPrice() +
            ", authorId=" + getAuthorId() +
            ", authorLname='" + getAuthorLname() + "'" +
            "}";
    }
}
