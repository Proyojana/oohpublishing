var TinyMCE_mySavePlugin = {
  /**
     * Returns information about the plugin as a name/value array.
     * The current keys are longname, author, authorurl, infourl and version.
     *
     * @returns Name/value array containing information about the plugin.
     * @type Array 
     */
    getInfo : function() {
        return {
            longname : 'my own Save Plugin',
            author : 'me',
            authorurl : 'none',
            infourl : false,
            version : '1.00'
        };
    },

    getControlHTML : function(cn) {
        switch (cn) {
            case "save":
                return tinyMCE.getButtonHTML(cn, 'lang_save_desc', '../images/save.gif', 'mceSave');
        }
        return "";
    },

    execCommand : function(editor_id, element, command, user_interface, value) {
        // Handle commands
        switch (command) {
            case "mceSave":
                // cleanup contents
                if(tinyMCE.instances[editor_id].visualAid) tinyMCE.execInstanceCommand(editor_id,'mceToggleVisualAid', false);
                tinyMCE.execInstanceCommand(editor_id,'mceCleanup', false);

                // get HTML code
                var HTML = tinyMCE.getContent();

                // prepare form element for submitting
                var parentForm = TinyMCE_mySavePlugin._getParentForm(editor_id);
                if(!parentForm) {
                    alert("No form to submit! Check your editor implementation!");
                    return true;
                }

                parentForm.removeChild(document.getElementById(editor_id+"_parent")); // remove editor
                var hidden_input = document.createElement("input"); // create a hidden input field 
                hidden_input.type = "hidden";
                hidden_input.name = tinyMCE.settings['elements'];
                hidden_input.value = HTML;

                parentForm.appendChild(hidden_input);

                // break some of tinyMCE's automatic behaviours (yes, it's dirty programming, I know!)
                tinyMCE.removeTinyMCEFormElements = function(){return true;};
                tinyMCE.triggerSave = function(){return true;};

                // save contents
                parentForm.submit();

                return true;
            break;
        }
        // Pass to next handler in chain
        return false;
    },

    _getParentForm : function (editor_id) {
        // returns the form in which tinyMCE resides
        var parentForm = false;
        var parentElement = document.getElementById(editor_id + "_parent");
        while (!parentForm) {
            parentElement = parentElement.parentNode;
            if (parentElement.tagName.toLowerCase() == "body")
                parentForm = "";
            if (parentElement.tagName.toLowerCase() == "form")
                parentForm = parentElement;
        }
        // if no form was found return false
        return (parentForm == "") ? false : parentForm;
    }
};

// Adds the plugin class to the list of available TinyMCE plugins
tinyMCE.addPlugin("mysave", TinyMCE_mySavePlugin);