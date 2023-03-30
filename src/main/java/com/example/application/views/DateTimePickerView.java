package com.example.application.views;

import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.datetimepicker.DateTimePickerVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("DateTimePicker")
@Route(value = "dateTimePicker", layout = MainLayout.class)
public class DateTimePickerView extends ViewThemeVariantComponent<DateTimePicker, DateTimePickerVariant> {

    public DateTimePickerView() {
        var dateTimePicker = new DateTimePicker();
        setComponent(dateTimePicker, DateTimePickerVariant.values());
    }

}
