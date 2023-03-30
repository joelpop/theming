package com.example.application.views;

import com.vaadin.flow.component.timepicker.TimePicker;
import com.vaadin.flow.component.timepicker.TimePickerVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("TimePicker")
@Route(value = "timePicker", layout = MainLayout.class)
public class TimePickerView extends ViewThemeVariantComponent<TimePicker, TimePickerVariant> {

    public TimePickerView() {
        var timePicker = new TimePicker();
        setComponent(timePicker, TimePickerVariant.values());
    }

}
