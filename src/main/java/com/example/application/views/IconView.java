package com.example.application.views;

import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("Icon")
@Route(value = "icon", layout = MainLayout.class)
public class IconView extends ViewComponent<Icon> {

    public IconView() {
        var icon = VaadinIcon.USER.create();
        setComponent(icon);
    }

}
