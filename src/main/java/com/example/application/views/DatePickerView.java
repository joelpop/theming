package com.example.application.views;

import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.datepicker.DatePickerVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("DatePicker")
@Route(value = "datePicker", layout = MainLayout.class)
public class DatePickerView extends ViewThemeVariantComponent<DatePicker, DatePickerVariant> {

    public DatePickerView() {
        var datePicker = new DatePicker();
        setComponent(datePicker, DatePickerVariant.values());
    }

}
