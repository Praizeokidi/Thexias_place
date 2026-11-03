$path='src\App.jsx'
$text=[IO.File]::ReadAllText($path)
$text=$text.Replace("  ArrowLeft,$([Environment]::NewLine)",'')
$text=$text.Replace('function Card({ p, open, openImage, add, wishlisted, toggleWishlist, index })','function Card({ p, open, add, wishlisted, toggleWishlist, index })')
$text=$text.Replace('function MensCard({ p, open, openImage, add, index })','function MensCard({ p, open, add, index })')
$text=$text.Replace('function MensPage({ back, open, openImage, add })','function MensPage({ back, open, add })')
$text=[regex]::Replace($text,'        type="button"\r?\n        onClick=\{\(\) => openImage\(p\)\}\r?\n        aria-label=\{`View images of \$\{p\.name\}`\}\r?\n','        onClick={() => open(p)}'+[Environment]::NewLine)
$text=$text.Replace('          View images <ArrowRight size={14} />','          Quick view <ArrowRight size={14} />',1)
$text=$text.Replace('          View images <ArrowRight size={14} />','          View piece <ArrowRight size={14} />',1)
$price='''      <div className="price">
        <b>{money(p.price)}</b>
        <div className="price-actions">
          <button className="quick-view-link" type="button" onClick={() => open(p)}>
            Quick view
          </button>
          <button type="button" onClick={() => add(p)}>
            Add <Plus size={14} />
          </button>
        </div>
      </div>'''
$old='''      <div className="price">
        <b>{money(p.price)}</b>
        <button onClick={() => add(p)}>
          Add <Plus size={14} />
        </button>
      </div>'''
$text=$text.Replace($price,$old)
$text=[regex]::Replace($text,'(?s)\r?\nfunction ImageViewer\(\{ p, close \}\) \{.*?\r?\n\}\r?\nfunction Modal',"`r`nfunction Modal")
$text=$text.Replace('    [imageViewer, setImageViewer] = useState(null),'+[Environment]::NewLine,'')
$text=$text.Replace('          openImage={setImageViewer}'+[Environment]::NewLine,'')
$text=$text.Replace('              openImage={openImage}'+[Environment]::NewLine,'')
$text=[regex]::Replace($text,'(?s)\r?\n      \{imageViewer && \(\r?\n        <ImageViewer p=\{imageViewer\} close=\{\(\) => setImageViewer\(null\)\} />\r?\n      \)}','')
[IO.File]::WriteAllText($path,$text)
$cssPath='src\styles.css'
$css=[IO.File]::ReadAllText($cssPath)
$cssStart=$css.IndexOf('.price-actions{')
if($cssStart -ge 0){[IO.File]::WriteAllText($cssPath,$css.Substring(0,$cssStart).TrimEnd()+[Environment]::NewLine)}
Write-Output "APP_HAS_IMAGE_VIEWER=$([IO.File]::ReadAllText($path).Contains('function ImageViewer'))"
Write-Output "APP_HAS_VIEWER_STATE=$([IO.File]::ReadAllText($path).Contains('imageViewer'))"
Write-Output "APP_HAS_OPEN_IMAGE=$([IO.File]::ReadAllText($path).Contains('openImage'))"
Write-Output "CSS_HAS_IMAGE_VIEWER=$([IO.File]::ReadAllText($cssPath).Contains('.image-viewer-overlay'))"