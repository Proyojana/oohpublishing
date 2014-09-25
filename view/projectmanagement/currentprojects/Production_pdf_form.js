var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.projectmanagement.currentprojects.Production_pdf_form' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.production_pdf_form',
   		id:'production_pdf_form',
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
		//var heads = Ext.create('MyDesktop.store.HeadedBy');
		//heads.load({params:{action: 5}});
		this.items = [
			           {
							xtype : 'textfield',
							x : 10,
							y : 10,
							fieldLabel:'From',
							id:'production_pdf_from',
							width:700
						},{
							xtype:'textfield',
							fieldLabel:'To',
							//multiSelect:true,
							id:'production_pdf_to',
							x:10,
							y:40,
							
							width:700,
							allowBlank: false,
							afterLabelTextTpl: required,
						},
						{
							xtype:'textfield',
							fieldLabel:'Cc',
							//multiSelect:true,
							id:'production_pdf_cc',
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
							id:'production_pdf_message',
							x:10,
							y:100,
							width:700,
							height:200
						},

						]
					
		this.callParent();
	}
     
}); 


