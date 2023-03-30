package com.example.application.views;

import com.vaadin.flow.component.richtexteditor.RichTextEditor;
import com.vaadin.flow.component.richtexteditor.RichTextEditorVariant;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("RichTextEditor")
@Route(value = "richTextEditor", layout = MainLayout.class)
public class RichTextEditorView extends ViewThemeVariantComponent<RichTextEditor, RichTextEditorVariant> {

    public RichTextEditorView() {
        var richTextEditor = new RichTextEditor();
        setComponent(richTextEditor, RichTextEditorVariant.values());
    }

}
