import { View, Text, Image } from "react-native";

const ProductWindow = ({ product }) => {
    return (
        <View className="bg-[#808488] text-white font-bold rounded-lg shadow-lg p-3">
            <Image className="rounded-lg" source={require("./icon.png")} style={{ width: 100, height: 100 }} />
            <Text className="text-lg font-bold ]" >{product.name}</Text>
            <View className="flex-row">
                <Text className="text-[#0A5280]">Rp{product.price}</Text>
                <Text className="text-[#0A5280]">Add Product</Text>
            </View>
        </View>
    );
};

export default ProductWindow;
