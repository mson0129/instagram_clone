import BreadCrumb from "./BreadCrumb";

const ProductsView = (): JSX.Element => {
    if ('loading' === ProductsLoadable.state) {
        return <ProductsViewLoad />;
    }

    return (
        <div>
            <BreadCrumb category={product.category} crumb={product.title} />
        </div>
    );
};

export default ProductsView;