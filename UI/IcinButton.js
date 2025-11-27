import { Pressable, View ,StyleSheet} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function Iconbutton({icon , size, color , onPress}){
    return (<Pressable onPress={onPress} style={({pressed})=> pressed&&styles.pressed}>
        <View style={styles.buttoncont}>
            <Ionicons name={icon} size={size} color={color}/>

        </View>
    </Pressable>)
}
export default Iconbutton
const styles=StyleSheet.create({
    buttoncont:{
        borderRadius:24,
        padding:6,
        margin:8
    },
    pressed:{
        opacity:0.5
    }

})