function SyncTask(url, args) {
  this.url = url;
  this.args = args;
}

SyncTask.prototype.run = function() {
  let othis = this;
  
  return new Promise(
    function(resolve, reject) {
      let args_str = JSON.stringify(othis.args);
      
      fetch(othis.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: args_str,
      })
      .then(resp => resp.json())
      .then(json => resolve(json));
    });
}

function PromiseQ(tasks = [], max_runner = 1) {    
   this.tasks = tasks;
   this.running = [];
   this.done = [];
   this.max_runner = max_runner;
}

PromiseQ.prototype.next = function() {
  return this.tasks.length && this.running.length < this.max_runner;
}

PromiseQ.prototype.run = function () {
  while (this.next()) {    
    let task = this.tasks.shift();
    let prom = task.run();
    prom.then((rs) => {
      console.log(JSON.stringify(rs));
      this.done.push(this.running.shift());
      
      this.run();
    });

    this.running.push(prom);
    console.log(this.tasks.length);
  }
}


let tasks = [];
for (let i = 0; i < 200; i++) {
  tasks.push( 
    new SyncTask(
      'https://reqres.in/api/users', 
      {'name':'john0'+i, 'job':'eng0'+i}) );
}

pq = new PromiseQ(tasks, 5);
pq.run();

