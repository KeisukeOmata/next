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
//別のViewから緯度経度を渡される場合 => SearchLocationDelegate
class ViewController: UIViewController, CLLocationManagerDelegate, UIGestureRecognizerDelegate {

    //地図
    @IBOutlet weak var mapMKMapVIew: MKMapView!
    //長押しのジェスチャー
    @IBOutlet var pressUILongPressGestureRecognizer: UILongPressGestureRecognizer!
    //住所を表示するラベル
    @IBOutlet weak var addressUILabel: UILabel!
    //緯度経度から取得した住所を格納
    var addressString: String = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
    }

    //画面を長押ししたとき
    //IBAction作成時、TypeをAnyからUILongPressGestureRecognizerに変える
    @IBAction func pressAction(_ sender: UILongPressGestureRecognizer) {
        //画面を長押しした時
        if sender.state == .began {
        //画面を離したとき
        } else if sender.state == .ended {
            //長押しした地点
            let tapPoint = sender.location(in: view)
            //緯度経度に変換
            let latlog = mapMKMapVIew.convert(tapPoint, toCoordinateFrom: mapMKMapVIew)
            let lat = latlog.latitude
            let log = latlog.longitude
            //緯度経度を取得
            getLatLog(lat: lat, log: log)
        }
    }

    //住所を表示する
    func getLatLog(lat: CLLocationDegrees, log: CLLocationDegrees) {
        //CLGeocoderクラスのインスタンス
        let geocoder = CLGeocoder()
        //CLLocationクラスのインスタンス
        //緯度経度
        let location = CLLocation(latitude: lat, longitude: log)
        
        //CLGeocoderクラスのreverseGeocodeLocationメソッドに緯度経度を渡す
        geocoder.reverseGeocodeLocation(location) { (placeMarks, error) in
            //placeMarksがnilでなければ、placeMarksの1番目をplaceMarkに格納
            //オプショナルバインディング
            if let placeMark = placeMarks?.first {
                //administrativeArea => state
                //locality => city
                //県か市区町村がnilでない場合
                if placeMark.administrativeArea != nil || placeMark.locality != nil {
                    //nameは建物名
                    self.addressString = placeMark.name! + placeMark.administrativeArea! + placeMark.locality!
                } else {
                    self.addressString = placeMark.name!
                }
                //取得した住所をラベルに表示
                self.addressUILabel.text = self.addressString
            }
        }
    }

//    //画面遷移
//    @IBAction func show(_ sender: Any) {
//        performSegue(withIdentifier: "show", sender: nil)
//    }
//    //値を受け渡す
//    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
//        //segueのidentifierで分岐させる
//        if segue.identifier == "show" {
//            let showVC = segue.destination as! ShowViewController
//            showVC.delegate = self
//        }
//    }

//    //デリゲートメソッド
//    //別のViewで取得した緯度、経度から住所を表示する想定
//    func searchLocation(lat: String, log: String) {
//        //緯度、経度から中央値を作成
//        let center = CLLocationCoordinate2DMake(Double(lat)!, Double(log)!)
//        //表示する範囲を指定
//        let span = MKCoordinateSpan(latitudeDelta: 0.01, longitudeDelta: 0.01)
//        //領域を指定
//        let region = MKCoordinateRegion(center: center, span: span)
//        //地図に領域を設定
//        mapMKMapVIew.setRegion(region, animated: true)
//        //住所を表示
//        getLatLog(lat: Double(lat)!, log: Double(log)!)
//        addressUILabel.text = addressString
//    }

}
