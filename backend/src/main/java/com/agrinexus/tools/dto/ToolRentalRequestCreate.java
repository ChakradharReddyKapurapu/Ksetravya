package com.agrinexus.tools.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class ToolRentalRequestCreate {

    @NotNull(message = "Rental start date is required")
    @FutureOrPresent(message = "Start date must be today or in the future")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @NotNull(message = "Rental end date is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @Size(max = 1000, message = "Message must not exceed 1000 characters")
    private String message;

    public ToolRentalRequestCreate() {
    }

    public ToolRentalRequestCreate(LocalDate startDate, LocalDate endDate, String message) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.message = message;
    }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
