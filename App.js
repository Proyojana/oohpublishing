/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.onReady(function() {
  setTimeout(function(){
    Ext.get('loading').remove();
    Ext.get('loading-mask').fadeOut({remove:true});
  });
});

Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',

    requires: [
        'Ext.window.MessageBox',
		'Ext.ux.panel.PDF',
        'Ext.ux.desktop.ShortcutModel',
		'Ext.ux.LiveSearchGridPanel',
		'Ext.ux.form.MultiSelect',
		'Ext.ux.form.TinyMCETextArea',
		//'Ext.ux.exporter.Exporter',
        
        
    ],

    init: function() {
        // custom logic before getXYZ methods get called..	.
        this.callParent();
       
    },
    
    getModules : function(){
        return [
			Ext.create("MyDesktop.view.MasterWindow"),
            Ext.create("MyDesktop.view.ProjectWindow"),
            Ext.create("MyDesktop.view.BudgetsWindow"),
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();
      
if(role==1){
        return Ext.apply(ret, {
        	
            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
				   
                    
                    { name: 'Masters', iconCls: 'masters-shortcut', module: 'master-win',val:'left',   setLoading:true, }, 
                      { name: 'Projects', iconCls: 'projects', module: 'project-win',val:'left', mask:"waiting",},
                  // { name: 'Reports', iconCls: 'reportsmain', module: 'budgets-win',val:'left' ,   waitMsg:'Sending data...',},
                    
                  
                ]
            }),

            wallpaper: 'wallpapers/desktop.jpg',
            wallpaperStretch: false,
             	
        });
       
    }
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: name1,
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'Settings',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'Logout',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

			    onLogout: function () {
			Ext.Msg.confirm('Logging Out', 'Do you wish to Logout?', function(
			buttonText) {
			if (buttonText == "yes")
			{
			var logout = Ext.Ajax.request ({
			url: 'service/logout.php',
			success:function(){
			var redirect = 'index.php';
			window.location = redirect;
			}
			});
			}
			
			});
			}
			,

    onSettings: function () {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
