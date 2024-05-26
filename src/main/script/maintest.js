/**
 * @jest-environment jsdom
 */

const { animationTimeline } = require('./path/to/your/animationTimeline');

describe('animationTimeline', () => {
  beforeAll(() => {
    // Mock the HTML structure
    document.body.innerHTML = `
      <div class="container"></div>
      <div class="one"></div>
      <div class="two"></div>
      <div class="three"></div>
      <div class="four"></div>
      <div class="fake-btn"></div>
      <div class="hbd-chatbox">Happy Birthday</div>
      <div class="wish-hbd">Wish you the best</div>
      <div class="idea-1"></div>
      <div class="idea-2"></div>
      <div class="idea-3"></div>
      <div class="idea-4"></div>
      <div class="idea-5"></div>
      <div class="idea-6"><span></span></div>
      <div class="baloons"><img /></div>
      <div class="euy-dp"></div>
      <div class="hat"></div>
      <div class="wish"><h5></h5></div>
      <div class="eight"><svg></svg></div>
      <div class="six"></div>
      <div class="nine"><p></p></div>
      <div class="last-smile"></div>
      <button id="replay"></button>
    `;
  });

  test('should split and wrap characters in span elements', () => {
    animationTimeline();
    
    const textBoxChars = document.getElementsByClassName('hbd-chatbox')[0];
    const hbd = document.getElementsByClassName('wish-hbd')[0];

    expect(textBoxChars.innerHTML).toContain('<span>H</span><span>a</span><span>p</span><span>p</span><span>y</span> <span>B</span><span>i</span><span>r</span><span>t</span><span>h</span><span>d</span><span>a</span><span>y</span>');
    expect(hbd.innerHTML).toContain('<span>W</span><span>i</span><span>s</span><span>h</span> <span>y</span><span>o</span><span>u</span> <span>t</span><span>h</span><span>e</span> <span>b</span><span>e</span><span>s</span><span>t</span>');
  });

  test('should restart animation on replay button click', () => {
    const replayButton = document.getElementById('replay');
    const mockRestart = jest.fn();
    const tl = {
      restart: mockRestart,
    };
    jest.spyOn(TimelineMax.prototype, 'restart').mockImplementation(tl.restart);

    replayButton.click();

    expect(mockRestart).toHaveBeenCalled();
  });
});
