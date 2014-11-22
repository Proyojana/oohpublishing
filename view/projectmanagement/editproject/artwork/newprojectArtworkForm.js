
Ext.define('MyDesktop.view.projectmanagement.editproject.artwork.newprojectArtworkForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.editArtworkForm',
    id: 'editArtworkForm',
    margin: '10 10 10 10',
    layout: {
        type: 'absolute'
    },
    frame: true,

    requires: ['MyDesktop.view.projectmanagement.editproject.artwork.editprojectArtworkgrid', 'MyDesktop.view.projectmanagement.editproject.artwork.editprojectArtworkHeaderForm'
    ],
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',

    initComponent: function() {

        this.items = [

          {
                xtype: 'editprojectArtworkgrid',
                x: 0,
                y: 0,
                height: 200,
            }, 
            {
						xtype:'textfield',
						fieldLabel:'Total Cost',
						id:'total_cost',
						labelWidth:100,
						width:200,
						x:30,
						y:220,
					   
						
					},
					{
						xtype:'textfield',
						fieldLabel:'Total Redraws',
						labelWidth:100,
						id:'total_redraws',
						width:200,
						x:290,
						y:220,
					    
						
					},
					{
						xtype:'textfield',
						fieldLabel:'Total Relabel',
						labelWidth:100,
						width:200,
						id:'total_relabel',
						x:600,
						y:220,
					 
						
					},
					{
						xtype:'textfield',
						fieldLabel:'Total Final',
						labelWidth:100,
						width:200,
						id:'total_final',
						x:850,
						y:220,
					  
						
					},

        ]


        this.callParent();
    }

});