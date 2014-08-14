Ext.define('MyDesktop.model.ViewSchedule', {
        extend: 'Ext.data.Model',
        fields: [
           
           'schedule_id',{name: 'stageorder', type: 'string'},{name: 'activityid', type: 'int'}, {name: 'activity', type: 'string'},{name: 'stage', type: 'string'},{name: 'estimated_daysperstage', type: 'int'},{name: 'actual_daysperstage', type: 'int'},{name: 'estimated_start_date', type: 'date'},{name: 'actual_start_date', type: 'date'},{name: 'estimated_end_date', type: 'date'},{name: 'actual_end_date', type: 'date'}, {name: 'bufferday', type: 'int'}      
        ],
      //  idProperty: 'cityname'
    });
    