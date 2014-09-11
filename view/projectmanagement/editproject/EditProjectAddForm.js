var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
var require_one = '<span style="color:blue;font-weight:bold" data-qtip="Required">*</span>';
var times = Ext.create('Ext.data.Store', {
        fields: ['format'],
        data : [
            		{"format":"216 x 138"},
					{"format":"226 x 52"},
					{"format":"234 x 156"},
					{"format":"246 x 189"},
					{"format":"247 x 74"},
					{"format":"247 x 174"},
					{"format":"228 x 152"},
					{"format":"246 x 174"},
					{"format":"247 x 74"},
					
        ]
    });
      var cover = Ext.create('Ext.data.Store', {
        fields: ['type'],
        data : [
           {"type":"Gloss"},
            {"type":"Matt"}
        ]
    });
     var note = Ext.create('Ext.data.Store', {
        fields: ['note'],
        data : [
           {"note":"Foot Notes"},
            {"note":"Book endfoot"}
        ]
    });
Ext.define('MyDesktop.view.projectmanagement.editproject.EditProjectAddForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.editprojectaddform',
   	id:'editprojectaddform',
   	layout: {
              type: 'absolute'
            },
	frame:true,
	
	requires:['MyDesktop.store.Customers','MyDesktop.store.Workflow','MyDesktop.store.Customers_team'],
  
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
    
	initComponent:function(){

	   	var client = Ext.create('MyDesktop.store.Customers');
		client.load({params:{action: 1}});
		 var team = Ext.create('MyDesktop.store.Customers_team');
		var workflow = Ext.create('MyDesktop.store.Workflow');
		workflow.load({params:{action: 1}});
		
		this.items= [
			{
			id:'edit_project_id',
			name: 'edit_project_id',
			hidden:true
			},
			
		{
			id:'edit_job_code',
			fieldLabel: 'Job #',
			x:10,
			y:10,
			width:320,
			emptyText:'Ex.JOB001',
			allowBlank: false,
			afterLabelTextTpl: required,

    	},
    	{
			id:'edit_project_title',
			fieldLabel: 'Title',
			align:'center',
			x:360,
			y:10,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
    	/*{
    		
    		id:'edit_project_author',
			fieldLabel: 'Author',
			x:710,
			y:10,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},*/
    	{
			id:'edit_hb_isbn',
			fieldLabel: 'HB ISBN',
			x:10,
			y:40,
			width:320,
			maxLength: 13, // for validation
            enforceMaxLength :13,
			afterLabelTextTpl: require_one,
    	},
    	{
			id:'edit_pb_isbn',
			fieldLabel: 'PB ISBN',
			name: 'PB ISBN',
			align:'center',
			maxLength: 13, // for validation
            enforceMaxLength :13,
			x:360,
			y:40,
			width:320,
			afterLabelTextTpl: require_one,
			},
    	{
    	
    		id:'edit_project_series',
			fieldLabel: 'Series',
			x:10,
			y:70,
			width:320,
			
    	},
    	{
    		xtype:'combo',
			id:'edit_project_format',
			fieldLabel: 'Format',
			x:360,
			y:70,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			store:times,
			displayField:'format'
    	},
    	{
			id:'edit_project_design',
			fieldLabel: 'Design',
			align:'center',
			x:710,
			y:70,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
    	{
    		
    		id:'edit_castoff_extent',
			fieldLabel: 'Cast-off extent',
			x:10,
			y:100,
			width:320,
			hideTrigger:true,
			xtype:'numberfield',
			minValue: 0,
			 listeners: {
      'blur': function(t, ev, b)
{
// Ext.getBody().mask("Modifying Instance...");
// $.get("updateInstances/"+)
var value=t.lastValue;

var sum= value%2;

if(sum==0)
{

t.setValue(value);
}
else
{
var value1=value+1;
t.setValue(value1);
}

},
       }
    	},
    	{
    		xtype:'numberfield',
    		hideTrigger:true,
    		minValue: 0,
			id:'edit_confirmed_extent',
			fieldLabel: 'Confirmed extent',
			x:360,
			y:100,
			width:320,
			listeners: {
      'blur': function(t, ev, b)
{
// Ext.getBody().mask("Modifying Instance...");
// $.get("updateInstances/"+)
var value=t.lastValue;

var sum= value%2;

if(sum==0)
{

t.setValue(value);
}
else
{
var value1=value+1;
t.setValue(value1);
}

},
}
    	},
    	{
    		xtype:'datefield',
			id:'edit_client_deadline',
			fieldLabel: 'Client deadline',
			align:'center',
			x:10,
			y:130,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
    	{
    		xtype:'datefield',
    		id:'edit_agreed_deadline',
			fieldLabel: 'Agreed deadline',
			x:360,
			y:130,
			width:320,
			
    	},
       	{
        // Fieldset in Column 1 - collapsible via toggle button
       xtype:'fieldset',
        layout: 'hbox',
        title: 'For Indexing',
             x:0,
			y:160,
			layout:'absolute',
			 defaults: {
        labelWidth: 150,
    },
			height:95,
        items :[{
    		xtype:'numberfield',
    		minValue: 0,
    		
    		id:'edit_word_count',
			fieldLabel: 'Word count',
			x:0,
			y:0,
			width:320,
			
    	},
    	{
    		xtype:'numberfield',
    		minValue: 0,
    		
    		id:'edit_word_count_indexing',
			fieldLabel: 'Word count for indexing',
			x:350,
			y:0,
			width:320,
			
    	},
    	
		{  
			xtype:'numberfield',
			id:'edit_manuscript',
			//margin:'0 0 0 28',
			minValue: 0,
			fieldLabel: 'Manuscript pages',
			align:'center',
			x:700,
			y:0,
			//labelWidth:140,
			width:320,
    	},
    	{  
    		xtype:'numberfield',
    		allowNegative : false,
    		minValue: 0,
    		//margin:'0 0 0 36',
			id:'edit_index_extent',
			fieldLabel: 'Expected Index extent',
			align:'center',
			x:0,
			width:320,
			y:30,
		
    	},]
    },
         	{
        // Fieldset in Column 1 - collapsible via toggle button
       xtype:'fieldset',
        layout: 'hbox',
        title: 'Print details',
             x:0,
			y:265,
			layout:'absolute',
			 defaults: {
        labelWidth: 150,
    },
			height:105,
        items :[
        {  
    		xtype: 'checkboxfield',
			id:'edit_chapter_footer',
			fieldLabel: 'Chapter footer required',
			align:'center',
			x:00,
			y:0,
			width:320,
    	},
    	
        {  
    		xtype: 'checkboxfield',
			id:'edit_contain_colour',
			fieldLabel: 'Contains colour',
			align:'center',
			x:350,
			y:0,
			width:320,
		
    	},
    	{
    		xtype:'combo',
    		id:'edit_cover_type',
			fieldLabel: 'Cover type',
			x:700,
			y:0,
			width:320,
			store:cover,
			displayField:'type',
			//labelWidth:140,
			
    	},
    	
		{  
			xtype:'numberfield',
			id:'edit_print_run',
			minValue: 0,
			fieldLabel: 'Print run',
			align:'center',
			x:0,
			y:30,
			width:320,
    	},
    	{
    		xtype: 'checkboxfield',
			id:'edit_print_run_confirmed',
			//fieldLabel: 'Chapter footer required',
			//align:'center',
			x:350,
			y:30,
			width:20,
    		
    	},
    	{
    		xtype:'label',
    		text:'Print run confirmed?',
    		x:370,
			y:30,
			width:320,
    		
    	},
    	{
    		xtype:'combo',
			id:'edit_project_note',
			fieldLabel: 'Note',
			x:700,
			y:30,
			width:320,
			store:note,
			displayField: 'note',
			valueField: 'note',
    	}
    	]
    },
    	/*{  
    		xtype: 'checkboxfield',
			id:'edit_chapter_footer',
			fieldLabel: 'Chapter footer required',
			align:'center',
			x:10,
			y:390,
			width:320,
    	},
    	{  
    		xtype: 'checkboxfield',
			id:'edit_contain_colour',
			fieldLabel: 'Contains colour',
			align:'center',
			x:360,
			y:280,
			width:320,
		
    	},*/
    	{  
    		xtype:'combo',
			id:'edit_project_client',
			fieldLabel: 'Client',
			align:'center',
			x:10,
			y:390,
			width:320,
			store:client,
			displayField: 'name',
			valueField: 'id',
			listeners : {
				change : function() {
					//var currentForm = this.up('newprojectaddform');
					var clientId = Ext.getCmp('edit_project_client').getValue();
					team.load({params:{action:6,clientId:clientId}}); 
					workflow.load({params:{action:8,clientId:clientId}}); 
				}
			}
    	},
    	{   
    		xtype:'combo',
			id:'edit_project_team',
			fieldLabel: 'Client Team',
			align:'center',
			x:360,
			y:390,
			width:320,
			store:team,
			displayField: 'name',
			valueField: 'id',
		
    	},
    	{   
    		xtype:'combo',
			id:'edit_project_workflow',
			fieldLabel: 'Workflow',
			align:'center',
			x:710,
			y:390,
			width:320,
			store:workflow,
			displayField: 'workflow_name',
			valueField: 'workflow_id',
    	},
    	
    	
    			{
			xtype: 'button',
		  	text: 'Update',
		  	iconCls: 'editClass',
		  	id:'edit_edit_team',
			align:'center',
			x:450,
			y:440,
			width:75,
			handler: function ()
			   {
			                 
                var currentForm = this.up('editprojectaddform');
                var project_id = Ext.getCmp("edit_project_id").getValue();
				var job_code = Ext.getCmp('edit_job_code').getValue();
				var project_title = Ext.getCmp('edit_project_title').getValue();
				//var project_author= Ext.getCmp('edit_project_author').getValue();
				var hb_isbn= Ext.getCmp('edit_hb_isbn').getValue();
				var pb_isbn= Ext.getCmp('edit_pb_isbn').getValue();
				
				var project_series = Ext.getCmp('edit_project_series').getValue();
				var project_format = Ext.getCmp('edit_project_format').getValue();
				var project_design= Ext.getCmp('edit_project_design').getValue();
				var castoff_extent= Ext.getCmp('edit_castoff_extent').getValue();
				var confirmed_extent= Ext.getCmp('edit_confirmed_extent').getValue();
				
				var client_deadline = Ext.getCmp('edit_client_deadline').getValue();
				var agreed_deadline = Ext.getCmp('edit_agreed_deadline').getValue();
				var word_count= Ext.getCmp('edit_word_count').getValue();
				var manuscript= Ext.getCmp('edit_manuscript').getValue();
				var index_extent= Ext.getCmp('edit_index_extent').getValue();
				var project_note= Ext.getCmp('edit_project_note').getValue();
				var chapter_footer = Ext.getCmp('edit_chapter_footer').getValue();
				var contain_colour = Ext.getCmp('edit_contain_colour').getValue();
				var project_client= Ext.getCmp('edit_project_client').getValue();
				var project_team= Ext.getCmp('edit_project_team').getValue();
				var project_workflow= Ext.getCmp('edit_project_workflow').getValue();
                
                if(currentForm.getForm().isValid() == true)
				{
					var conn = new Ext.data.Connection();
					conn.request({
					url: 'service/EditProjects.php',
					method: 'POST',
					params : {action:3,project_id:project_id,job_code:job_code,project_title:project_title,hb_isbn:hb_isbn,pb_isbn:pb_isbn,
						project_series:project_series,project_format:project_format,project_design:project_design,castoff_extent:castoff_extent,confirmed_extent:confirmed_extent,
						client_deadline:client_deadline,agreed_deadline:agreed_deadline,word_count:word_count,manuscript:manuscript,index_extent:index_extent,
						chapter_footer:chapter_footer,contain_colour:contain_colour,project_client:project_client,project_team:project_team,project_workflow:project_workflow,project_note:project_note},
					success:function(response){
					obj = Ext.JSON.decode(response.responseText);
					Ext.Msg.alert('Message', obj.message); 
					
					}
					});
				}
                
                
                
                
			}
	  	},
		
	  	{
			xtype: 'button',
		  	text: 'Cancel',
		  	iconCls: 'button_reset',
		  	id:'edit_reset_team',
			x:550,
			y:440,
			width:75,
			handler: function (){
				
			}
	  	} ]
	  
	
		
	this.callParent();
	}
     
}); 


