import { Component, OnInit, HostListener, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, interval } from 'rxjs';
import { Subject } from 'rxjs';
import { scan, switchMap, takeWhile, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {


  currentSection: BehaviorSubject<string> = new BehaviorSubject('podbor');
  sections: string[] = ['podbor','proverka','torgi','pokupka','dostavka','freight','odessa','customs','address','remont','cert','uchet'];

  scrollToSource: Subject<any> = new Subject<any>();

  @HostListener('window:scroll', ['$event'])
  scrollDetection(e: any) {
    console.log(e);

    this.scrollPosition = window.pageYOffset;
    console.log(this.scrollPosition);
    // this.fragment = '';

  }

  fragment = '';
  componentDestroyed$: Subject<boolean> = new Subject();
  scrollPosition = 0;
  constructor(
    public route: ActivatedRoute,
  ) {
    document.addEventListener('scroll', () => {
      this.keepTrack();
    }, {
      passive: true
    })
  }

  ngOnInit(): void {

    this.scrollToSource.pipe(switchMap(targetYPos =>
      interval(100).pipe( //interval just creates an observable stream corresponding to time, this emits every 1/10th of a second. This can be fixed or make it dynamic depending on the distance to scroll
        scan((acc, curr) => acc + 5, window.pageYOffset), // scan takes all values from an emitted observable stream and accumulates them, here you're taking the current position, adding a scroll step (fixed at 5, though this could also be dynamic), and then so on, its like a for loop with +=, but you emit every value to the next operator which scrolls, the second argument is the start position
        takeWhile(val => val < targetYPos)) // stop when you get to the target
    )).subscribe(position => window.scrollTo(0, position)); // here is where you scroll with the results from scan

    this.route.fragment.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(
      (fragment) => {
        console.log(fragment);
        this.fragment = fragment;
      }
    );

    this.currentSection.subscribe(
      (res) => {
        console.log("current section: ", res)
      }
    )

  }

  keepTrack() {
    const viewHeight = window.innerHeight;
    for (var section of this.sections) {
     const element = document.getElementById(section);
      if (element != null) {
       const rect = element.getBoundingClientRect();
       if (rect.top >= 0 && rect.top < viewHeight / 2)
         {this.currentSection.next(section);}
      }
     }
   }

  getTargetElementRef(currentYPos: any) {
    // you need to figure out how this works
    // I can't comment much on it without knowing more about the page
    // but you inject the host ElementRef in the component / directive constructor and use normal vanillaJS functions to find other elements
  }

  scrollTo(target: ElementRef): void {
    // this assumes you're passing in an ElementRef, it may or may not be appropriate, you can pass them to functions in templates with template variable syntax such as: <div #targetDiv>Scroll Target</div> <button (click)="scrollTo(targetDiv)">Click To Scroll</button>
    this.scrollToSource.next(target);
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }


  //switch map takes the last value emitted by an observable sequence, in this case, the user's latest scroll position, and transforms it into a new observable stream


}
