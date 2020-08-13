//Map Kit View
//Long Press Gesture Recognizer

import UIKit
//地図で利用
import MapKit
//地図で利用
import CoreLocation

//地図で利用するデリゲートプロトコル
//CLLocationManagerDelegate
//UIGestureRecognizerDelegate
class ViewController: UIViewController, CLLocationManagerDelegate, UIGestureRecognizerDelegate {

    //地図
    @IBOutlet weak var mapMKMapVIew: MKMapView!
    //長押しのジェスチャー
    @IBOutlet var pressUILongPressGestureRecognizer: UILongPressGestureRecognizer!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
    }

    //画面を長押ししたとき
    //TypeをAnyからUILongPressGestureRecognizerに変える
    @IBAction func pressAction(_ sender: UILongPressGestureRecognizer) {
    }
    
}

