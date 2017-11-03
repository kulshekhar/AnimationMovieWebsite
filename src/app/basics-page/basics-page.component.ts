import { Component } from '@angular/core';
import { trigger, transition, style, state, animate } from '@angular/animations';
import { KeyboardBinding, Keys } from '../keyboard.service';
import { AnimationCountService } from '../animation-count.service';

const SECTIONS = {
  intro: 1,
  triggers: 2,
  component: 3,
  transition: 4,
  fadeInFadeOut: 5,
  animationCallback: 6
};

const UP_ARROW_CODE = 38;
const DOWN_ARROW_CODE = 40;

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrls: ['./basics-page.component.scss'],
  animations: [
    trigger('contentAnimation', [
      transition(':enter', []),

      state(`${SECTIONS.intro}`, style({ transform: 'translateY(0px)' })),
      state(`${SECTIONS.triggers}`, style({ transform: 'translateY(-500px)' })),
      state(`${SECTIONS.component}`, style({ transform: 'translateY(-1200px)' })),
      state(`${SECTIONS.transition}`, style({ transform: 'translateY(-1900px)' })),
      state(`${SECTIONS.fadeInFadeOut}`, style({ transform: 'translateY(-2600px)' })),
      state(`${SECTIONS.animationCallback}`, style({ transform: 'translateY(-3100px)' })),

      transition('* => *', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)'))
    ])
  ]
})
export class BasicsPageComponent {
  section = SECTIONS.intro;
  visibleSection = SECTIONS.intro;

  sections = SECTIONS;

  private _keydownBinding: KeyboardBinding;

  constructor(private _animationCount: AnimationCountService) {
    this._animationCount.setTotal(2);
  }

  ngOnInit() {
    this._keydownBinding = new KeyboardBinding([Keys.KEY_UP, Keys.KEY_DOWN], keyCode => {
      if (keyCode === Keys.KEY_UP) {
        this.up();
      } else if (keyCode === Keys.KEY_DOWN) {
        this.down();
      }
    });
  }

  ngOnDestroy() {
    this._keydownBinding.deregister();
  }

  up() {
    this.section = Math.max(this.section - 1, 1);
  }

  down() {
    this.section = Math.min(this.section + 1, Object.keys(SECTIONS).length);
  }

  isActive(value: number) {
    return value === this.section;
  }

  onInnerSectionClick(value: number) {
    if (value != this.visibleSection) {
      this.section = value;
    }
  }
}
