var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.projectmanagement.currentprojects.Production_html_form' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.production_html_form',
   		id:'production_html_form',
    margin: '10 10 10 10',
	layout: {
                                type: 'absolute'
                            },
	
	frame:true,
	//requires:['MyDesktop.view.projectmanagement.currentprojects.scheduleGrid','MyDesktop.view.projectmanagement.currentprojects.ScheduleAddForm11'],
    //title:'Schedule for production',
    defaults: {
        
        labelWidth: 90,

    },

    defaultType: 'textfield',
	
	initComponent:function(){
		var customers = Ext.create('MyDesktop.store.Reports');
		customers.load({
			params: {
				action: 2
			}
		});
		this.items = [
			           {
							xtype : 'textfield',
							x : 10,
							y : 10,
							fieldLabel:'From',
							id:'production_html_from',
							width:700
						},{
							xtype:'combo',
							hideTrigger: true,
							fieldLabel:'To',
							multiSelect:true,
							id:'production_html_to',
							x:10,
							y:40,
							store:customers,
							
							triggerAction:'all',
							displayField:'mail',
							queryMode: 'local',
							width:700,
							allowBlank: false,
							afterLabelTextTpl: required,
						},
						{
							xtype:'textfield',
							fieldLabel:'Cc',
							//multiSelect:true,
							id:'production_html_cc',
							x:10,
							y:70,
							//store:customers,
							/*ddReorder: true,
							//typeAhead:true,
							triggerAction:'all',
							displayField:'mail',*/
							width:700
						},
						{
							xtype:'textarea',
							fieldLabel:'Message',
							id:'production_html_message',
							x:10,
							y:100,
							width:700,
							height:200
						},

						]
					
		this.callParent();
	}
     
}); 


