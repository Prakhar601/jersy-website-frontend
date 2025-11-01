import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import useCart from '../hooks/useCart';

export default function CustomizePage() {
  const { id } = useParams();
  const api = useApi();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedColor, setSelectedColor] = useState('');
  const [overlayText, setOverlayText] = useState('');
  const [selectedFont, setSelectedFont] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [maskMode, setMaskMode] = useState('full'); // 'full' | 'half'

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await api.get(`/products/${id}`);
        if (!isMounted) return;
        setProduct(data);
        setSelectedColor(data?.colors?.[0] || '');
        setSelectedFont(data?.fonts?.[0] || '');
        setSelectedSize(data?.sizes?.[0] || '');
        setSelectedVariant(data?.variants?.[0]?.id || data?.variants?.[0] || '');
      } catch (e) {
        if (isMounted) setError(e?.message || 'Failed to load product');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, [id]);

  const baseImage = useMemo(() => product?.images?.[0] || product?.image || '', [product]);

  function handleAddToCart() {
    if (!product) return;
    const priceFromVariant = (() => {
      if (Array.isArray(product.variants) && product.variants.length > 0) {
        const match = product.variants.find((v) => (typeof v === 'string' ? v : v.id) === selectedVariant);
        if (match && typeof match !== 'string') return match.price;
      }
      return product.price;
    })();
    addToCart({
      productId: product.id,
      title: product.name,
      thumbnail: baseImage,
      options: {
        color: selectedColor,
        text: overlayText,
        font: selectedFont,
        size: selectedSize,
        variant: selectedVariant,
        mask: maskMode,
      },
      quantity: 1,
      price: priceFromVariant ?? 0,
    });
  }

  if (loading) return <div className="container">Loading product...</div>;
  if (error) return <div className="container error">{error}</div>;
  if (!product) return <div className="container">Product not found</div>;

  return (
    <div className="container customize-layout">
      <div className="preview-area">
        <div className={`preview-canvas ${maskMode === 'half' ? 'mask-half' : 'mask-full'}`}>
          {baseImage ? <img src={baseImage} alt={product.name} className="preview-image" /> : <div className="preview-placeholder" />}
          {/* Color overlay */}
          <div className="color-overlay" style={{ background: selectedColor || 'transparent' }} />
          {/* Text overlay */}
          <div className="text-overlay" style={{ fontFamily: selectedFont || 'inherit' }}>{overlayText}</div>
        </div>
        <div className="mask-toggle">
          <label><input type="radio" name="mask" checked={maskMode === 'full'} onChange={() => setMaskMode('full')} /> Full</label>
          <label><input type="radio" name="mask" checked={maskMode === 'half'} onChange={() => setMaskMode('half')} /> Half</label>
        </div>
      </div>

      <div className="controls-area">
        <h2>{product.name}</h2>

        {/* Colors */}
        {Array.isArray(product.colors) && product.colors.length > 0 && (
          <div className="control-group">
            <div className="control-label">Color</div>
            <div className="swatches">
              {product.colors.map((c) => (
                <button
                  key={c}
                  className={`swatch ${selectedColor === c ? 'active' : ''}`}
                  style={{ background: c }}
                  onClick={() => setSelectedColor(c)}
                  aria-label={`Select color ${c}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Text */}
        <div className="control-group">
          <div className="control-label">Text</div>
          <input value={overlayText} onChange={(e) => setOverlayText(e.target.value)} placeholder="Type jersey text" />
        </div>

        {/* Font */}
        {Array.isArray(product.fonts) && product.fonts.length > 0 && (
          <div className="control-group">
            <div className="control-label">Font</div>
            <select value={selectedFont} onChange={(e) => setSelectedFont(e.target.value)}>
              {product.fonts.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        )}

        {/* Size */}
        {Array.isArray(product.sizes) && product.sizes.length > 0 && (
          <div className="control-group">
            <div className="control-label">Size</div>
            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
              {product.sizes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        )}

        {/* Variant */}
        {Array.isArray(product.variants) && product.variants.length > 0 && (
          <div className="control-group">
            <div className="control-label">Variant</div>
            <select value={selectedVariant} onChange={(e) => setSelectedVariant(e.target.value)}>
              {product.variants.map((v) => {
                const id = typeof v === 'string' ? v : v.id;
                const label = typeof v === 'string' ? v : (v.name || v.id);
                return <option key={id} value={id}>{label}</option>;
              })}
            </select>
          </div>
        )}

        <button className="primary" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}


