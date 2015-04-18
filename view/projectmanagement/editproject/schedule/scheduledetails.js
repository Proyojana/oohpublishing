Ext.define('MyDesktop.view.projectmanagement.editproject.schedule.scheduledetails', {
	extend : 'Ext.grid.property.Grid',
	alias : 'widget.scheduledetails',
	closeAction : 'hide',
	height : 235,
	hideHeaders : true,
	enableColumnResize : true,
	id : 'scheduledetails',
	listeners : {
		'beforeedit' : {
			fn : function() {
				return false;
			}
		}
	},
	source : {
		"Jobcode" : "",
		
		"Projectname" : "",
	}
});
