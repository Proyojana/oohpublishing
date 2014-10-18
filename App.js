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
  }, 25);
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
        /*'MyDesktop.view.SystemStatus',
        'MyDesktop.view.VideoWindow',
        'MyDesktop.view.GridWindow',*/
	
		//'MyDesktop.view.CollaboratorsWindow',
		'MyDesktop.view.MasterWindow',
        //'MyDesktop.view.TabWindow',
        /*'MyDesktop.view.AccordionWindow',
        'MyDesktop.view.Notepad',
		'MyDesktop.view.WordMark',
        'MyDesktop.view.BogusMenuModule',
        'MyDesktop.view.BogusModule',
          'MyDesktop.view.Settings',*/
     'MyDesktop.view.ProjectWindow',
     'MyDesktop.view.BudgetsWindow'
        
    ],

    init: function() {
        // custom logic before getXYZ methods get called..	.
        this.callParent();
       
		/*if(role==3){
		  var win = Ext.create("Ext.window.Window", {
			title:'Welcome '+name1+' !',
			maximizable: false,
			minimizable: true,
			width: 300,
			height: 300,
			id:'dashwin',
		
			items: [{
				xtype:'dashboardform',
				height:100,
				},
				{
					xtype:'recentacc',
					height:200,
					y:5
					
				}
				]
		});

		win.show();
        // now ready...
    }
     else{
		  var win = Ext.create("Ext.window.Window", {
			title:'Welcome '+name1+' !',
			maximizable: false,
			minimizable: true,
			width: 300,
			height: 200,
			id:'dashwin',
		
			items: [
				{
					xtype:'recentacc',
					height:200,
					y:5
					}
				]
		});

		win.show();
        // now ready...
    }*/
        // now ready...
    },
    //controllers:['EmployeeGroup'],
    getModules : function(){
        return [
           /* new MyDesktop.view.VideoWindow(),            
            new MyDesktop.view.SystemStatus(),
            new MyDesktop.view.GridWindow(),
            new MyDesktop.view.TabWindow(),*/
			new MyDesktop.view.MasterWindow(),
          /*  new MyDesktop.view.AccordionWindow(),
            new MyDesktop.view.Notepad(),
			new MyDesktop.view.WordMark(),
            new MyDesktop.view.BogusMenuModule(),
            new MyDesktop.view.BogusModule(),*/
            new MyDesktop.view.ProjectWindow(),
            new MyDesktop.view.BudgetsWindow(),
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();
      
if(role==1){
        return Ext.apply(ret, {
        	
            //cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
				   
                    
                    { name: 'Masters', iconCls: 'masters-shortcut', module: 'master-win',val:'left',   setLoading:true, }, 
                      { name: 'Projects', iconCls: 'projects', module: 'project-win',val:'left', mask:"waiting",},
                      //  { name: 'Budgets', iconCls: 'payroll-shortcut', module: 'budgets-win',val:'left' ,   waitMsg:'Sending data...',},
                   { name: 'Reports', iconCls: 'reportsmain', module: 'budgets-win',val:'left' ,   waitMsg:'Sending data...',},
                    
                  
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
            quickStart: [
               /* { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
                { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }*/
            ],
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
			// alert("logout");
			var redirect = 'index.html';
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
