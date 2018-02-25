
function init() {
    // Example 1. This will loop 5 times, and has a callback function at the end.
    var callback = function() { document.getElementById('btn1').value = 'play'; }
    mp1 = new MidiPlayer('Saved.mid', 'btn1', true, 5, callback);
    mp1.setDebugDiv('msg');

    // Example 2. This will not loop.
    mp2 = new MidiPlayer('Bach_Badinerie.mid', 'btn2');
}

function doPlay(m, btn) {
    if (btn.value == 'play') {
        m.play();
        btn.value = 'stop';
    }
    else {
        m.stop();
        btn.value = 'play';
    }
}

function do_clear() {
  document.getElementById('msg').innerHTML='';
  document.getElementById('div_clear').style.display='none';
}
function show_clear() {
    document.getElementById('div_clear').style.display='block';
}
</script>
