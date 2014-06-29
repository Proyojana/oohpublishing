/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.view.WordMark', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        //'Ext.form.field.HtmlEditor'
        'Ext.form.field.TextArea'
    ],

    id:'wordmark',

    init : function(){
        this.launcher = {
            text: 'WordMark',
            iconCls:'wordmark'
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('wordmark');
        if(!win){
            win = desktop.createWindow({
                id: 'wordmark',
                title:'Notepad',
                width:600,
                height:400,
                iconCls: 'wordmark',
                animCollapse:false,
                border: false,
                //defaultFocus: 'notepad-editor', EXTJSIV-1300

                // IE has a bug where it will keep the iframe's background visible when the window
                // is set to visibility:hidden. Hiding the window via position offsets instead gets
                // around this bug.
                hideMode: 'offsets',

                layout: 'fit',
                items: [
                    {
                       // xtype: 'htmleditor',
                        xtype: 'textarea',
                        id: 'notepad-editor'
                    },
					
						{
			xtype:'button',
    	    text:'Add',
    	    iconCls: 'button_add',
    	    id: 'add_activity',
			x:350,
			y:180,
			width:75,
			handler: function (){
				

			}
	  	}
					
                ]
            });
        }
        return win;
    }
});
