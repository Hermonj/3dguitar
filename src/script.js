/* To synchronize control panel and 3D object */

var d = document.documentElement;

// apply user input to CSS Variables
function apply(i, o, u, s)
{
var output, showover;
if(u){output = i.value + (u + '')}
else{output = Number(i.value)}

if(s){showover = output + (s + '')}
d.style.setProperty(o, output);
i.nextElementSibling.innerHTML = showover || output;
}

// apply calculations to CSS Variables
// (we could do it in pure CSS but we can't compromise with performance)
function apply_abs(i, o, u, c)
{
output = Number(i.value);
d.style.setProperty(o, output);
d.style.setProperty(c, Math.abs( Math.cos(output * (Math.PI / 180)) ));
i.nextElementSibling.innerHTML = output + (u + '');
}

// apply the texture preset
function applyDecision(i, o){
var db = document.body;
db.className = '';
void db.offsetWidth;
db.className = 'tpreset ' + i.classList[0];
(i.parentElement).parentElement.querySelector('input').value = o;
}

// detect the texture preset when page is reloaded (in Firefox)
function applyCache(cls){
var ele = document.querySelector(cls);
var prt = ele.parentElement;
var val = Number(ele.value);
var choices = prt.querySelectorAll('input');
applyDecision(choices[val + 1], val);
}

/* Startup */
window.addEventListener('load', function(){
applyCache('.decision_for_color');
apply(u_axis, '--xx', 'deg');
apply_abs(x_axis, '--x', 'deg', '--cos');
apply_abs(y_axis, '--y', 'deg', '--cos2');
apply(z_axis, '--z', null, 'deg');
apply(tx_axis, '--tx', 'px');
apply(ty_axis, '--ty', 'px');
apply(tz_axis, '--tz', 'px');
apply(perspective, '--p', 'px');
apply(scale, '--s');
apply(r_duration, '--rs', 's');
apply(r_duration_2, '--rs2', 's');
apply(pos_x, '--ptx', 'px');
apply(pos_y, '--pty', 'px');

// make the object scalable
setTimeout(function(){
d.classList.add("scalable");
}, 1000);

// print the number of elements used
var n_div = document.querySelectorAll("div").length;
var n_all = document.querySelectorAll("*").length;
console.info(`${n_div} <DIV>s for 3D object, ${n_all} elements overall.`);
});