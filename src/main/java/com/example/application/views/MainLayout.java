package com.example.application.views;

import com.example.application.components.appnav.AppNav;
import com.example.application.components.appnav.AppNavItem;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.accordion.Accordion;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.confirmdialog.ConfirmDialog;
import com.vaadin.flow.component.contextmenu.ContextMenu;
import com.vaadin.flow.component.cookieconsent.CookieConsent;
import com.vaadin.flow.component.details.Details;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Footer;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Header;
import com.vaadin.flow.component.login.LoginForm;
import com.vaadin.flow.component.login.LoginOverlay;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.messages.MessageInput;
import com.vaadin.flow.component.messages.MessageList;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.Scroller;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.progressbar.ProgressBar;
import com.vaadin.flow.component.shared.Tooltip;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.treegrid.TreeGrid;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.virtuallist.VirtualList;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.RouteBaseData;
import com.vaadin.flow.router.RouteConfiguration;
import com.vaadin.flow.theme.lumo.LumoUtility;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

/**
 * The main view is a top-level placeholder for other views.
 */
public class MainLayout extends AppLayout {

    private H2 viewTitle;

    public MainLayout() {
        setPrimarySection(Section.DRAWER);
        addDrawerContent();
        addHeaderContent();
    }

    private void addHeaderContent() {
        DrawerToggle toggle = new DrawerToggle();
        toggle.getElement().setAttribute("aria-label", "Menu toggle");

        viewTitle = new H2();
        viewTitle.addClassNames(LumoUtility.FontSize.LARGE, LumoUtility.Margin.NONE);

        addToNavbar(true, toggle, viewTitle);
    }

    private void addDrawerContent() {
        H1 appName = new H1("Theming");
        appName.addClassNames(LumoUtility.FontSize.LARGE, LumoUtility.Margin.NONE);
        Header header = new Header(appName);

        Scroller scroller = new Scroller(createNavigation());

        addToDrawer(header, scroller, createFooter());
    }

    private AppNav createNavigation() {
        // AppNav is not yet an official component.
        // For documentation, visit https://github.com/vaadin/vcf-nav#readme
        AppNav nav = new AppNav();

        RouteConfiguration.forSessionScope().getAvailableRoutes().stream()
                .map(RouteBaseData::getNavigationTarget)
                .filter(navigationTarget -> navigationTarget != MainView.class)
                .map(navigationTarget -> new AppNavItem(pageTitleOf(navigationTarget), navigationTarget))
                .forEach(nav::addItem);

        System.out.println("ACTION ACCESSORS");
        Stream.of(
//                        Button.class,
                        ContextMenu.class,
                        CookieConsent.class,
                        MenuBar.class,
//                        Tabs.class,
                        Upload.class
                ).map(Class::getSimpleName)
                .forEach(System.out::println);

        System.out.println("COMPONENT ORGANIZERS");
        Stream.of(
                        Accordion.class,
                        AppLayout.class,
                        FlexLayout.class,
                        VerticalLayout.class,
                        HorizontalLayout.class,
                        FormLayout.class,
                        Details.class,
                        Scroller.class,
                        SplitLayout.class
                ).map(Class::getSimpleName)
                .forEach(System.out::println);

        System.out.println("VISUALIZATIONS");
        Stream.of(
                        Avatar.class,
                        ProgressBar.class
                        ).map(Class::getSimpleName)
                .forEach(System.out::println);

        System.out.println("COLLECTION PRESENTERS");
        Stream.of(
                        Grid.class,
                        TreeGrid.class,
                        VirtualList.class
                ).map(Class::getSimpleName)
                .forEach(System.out::println);

        System.out.println("POPUPS");
        Stream.of(
                        ConfirmDialog.class,
                        Dialog.class,
                        LoginOverlay.class,
                        Notification.class,
                        Tooltip.class
                        ).map(Class::getSimpleName)
                .forEach(System.out::println);

        System.out.println("COMPOSITE");
        Stream.of(
                        LoginForm.class,
                        MessageInput.class,
                        MessageList.class
                ).map(Class::getSimpleName)
                .forEach(System.out::println);

        return nav;
    }

    private Footer createFooter() {
        Footer layout = new Footer();

        return layout;
    }

    @Override
    protected void afterNavigation() {
        super.afterNavigation();
        viewTitle.setText(getCurrentPageTitle());
    }

    private String getCurrentPageTitle() {
        return pageTitleOf(getContent().getClass());
    }

    private String pageTitleOf(Class<? extends Component> navigationTarget) {
        return Optional.ofNullable(navigationTarget.getAnnotation(PageTitle.class))
                .map(PageTitle::value)
                .orElse("");
    }
}
