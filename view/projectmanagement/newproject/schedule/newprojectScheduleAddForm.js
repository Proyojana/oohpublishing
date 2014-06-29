var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
var times = Ext.create('Ext.data.Store', {
        fields: ['weekday'],
        data : [
           {"weekday":"Sun"},
            {"weekday":"Mon"},
            {"weekday":"Tue"},
            {"weekday":"Wed"},
            {"weekday":"Thu"},
             {"weekday":"Fri"},
              {"weekday":"Sat"}
        ]
    });
Ext.define('MyDesktop.view.projectmanagement.newproject.schedule.newprojectScheduleAddForm' ,{
    extend: 'Ext.form.FieldSet',
    alias : 'widget.newprojectScheduleAddform',
   		id:'newprojectScheduleAddform',
    margin: '2 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	height:245,
	//requires:['MyDesktop.store.State'],
    title:'Schedule for production',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	initComponent:function(){
	/*	var ci = Ext.create('MyDesktop.store.State');
		ci.load({params:{action: 7}});
	    ci.loadPage(1);*/
		this.items= [
			{
			id:'job_id',
			fieldLabel: 'Job #',
			x:10,
			y:10,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
		{
			id:'days_per_stage',
			fieldLabel: 'Days per stage',
			align:'center',
			x:360,
			y:10,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
    		{
			id:'date',
			fieldLabel: 'Date',
			x:10,
			y:50,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	{
    		xtype:'combo',
			id:'weekday',
			fieldLabel: 'Weekday',
			name: 'weekday',
			align:'center',
			store:times,
			displayField:'weekday',
			x:360,
			y:50,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
			{
    		xtype: 'checkboxfield',
    		id:'index_included',
			fieldLabel: 'Index included',
			x:710,
			y:50,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	{
    		xtype:'datefield',
    		id:'ebook_qa_done',
			fieldLabel: 'e-book QA done',
			x:10,
			y:90,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
		//	xtype:'numberfield',
			minValue: 0,
    	},
    	{
    		xtype:'datefield',
    		id:'qa_done',
			fieldLabel: 'QA done',
			x:360,
			y:90,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
		//	xtype:'numberfield',
			minValue: 0,
    	},
    	{
    		xtype:'datefield',
    		id:'voucher_loaded',
			fieldLabel: 'Voucher Loaded',
			x:10,
			y:130,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
		//	xtype:'numberfield',
			minValue: 0,
    	},
    	{
    		xtype:'datefield',
    		id:'voucher_approved',
			fieldLabel: 'Voucher Approved',
			x:360,
			y:130,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
		//	xtype:'numberfield',
			minValue: 0,
    	},
    	{
    		xtype:'datefield',
    		id:'final_file_loaded',
			fieldLabel: 'Final File Loaded',
			x:710,
			y:130,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
		//	xtype:'numberfield',
			minValue: 0,
    	},
		{
			xtype:'button',
    	    text:'Add',
    	    iconCls: 'button_add',
    	//   id:'add_users',
			x:350,
			y:180,
			width:75,
			handler: function (){				
				var currentForm = this.up('cityform');
				var city_code = Ext.getCmp('citycode').getValue();
				var city_name = Ext.getCmp('cityname').getValue();
				var city_state= Ext.getCmp('cstateid').getValue();
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/City.php',
						method: 'POST',
						params : {action:5,city_code:city_code,city_name:city_name,city_state:city_state},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('citygrid').getStore().reload();
							Ext.getCmp('citytab').layout.setActiveItem('citygrid');
										
						}
					});
				}
				else
				{
				Ext.MessageBox.alert('Please fill the required data.');
				
				}
			}
	  	},
		
		{
			xtype: 'button',
		  	text: 'Edit',
		  	iconCls: 'editClass',
		//  	id:'edit_users',
			align:'center',
			x:450,
			y:180,
			width:75,
			handler: function ()
			   {
			   	var currentForm = this.up('cityform');
				var city_code = Ext.getCmp('citycode').getValue();
				var city_id = Ext.getCmp('cityid').getValue();
				var city_name = Ext.getCmp('cityname').getValue();
				var city_state= Ext.getCmp('cstateid').getValue();
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/City.php',
						method: 'POST',
						params : {action:4,city_id:city_id,city_code:city_code,city_name:city_name,city_state:city_state},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('citygrid').getStore().reload();
							Ext.getCmp('citytab').layout.setActiveItem('citygrid');
										
						}
					});
				}
				else
				{
				Ext.MessageBox.alert('Please fill the required data.');
				
				}
			}
	  	},
		
	  	{
			xtype: 'button',
		  	text: 'Reset',
		  	iconCls: 'button_reset',
		 // 	id:'reset_users',
			x:550,
			y:180,
			width:75,
			handler: function (){
				var currentForm = this.up('cityform');
				currentForm.getForm().reset();
				Ext.getCmp('citycode').setReadOnly(false);
			}
	  	} ]
	  
	
		
	this.callParent();
	}
     
}); 


