/**
 * 节流防抖函数
 *
 * @author zys
 * @since 2022/9/19 20:17
 */
export class ThrottleDebounceUtil {


    private static debounceTimer = null;
    /**
     * 防抖函数
     * @param fn
     * @param wait
     */
    static debounce(fn: Function, wait: number) {
        if (ThrottleDebounceUtil.debounceTimer !== null) {
            clearTimeout(ThrottleDebounceUtil.debounceTimer);
            ThrottleDebounceUtil.debounceTimer = null;
        }
        // @ts-ignore
        ThrottleDebounceUtil.debounceTimer = setTimeout(fn, wait)
    }

    private static throttleTimer = null;
    /**
     * 节流函数
     * @param fn
     * @param wait
     */
    static throttle(fn: Function, wait: number) {
        if (ThrottleDebounceUtil.throttleTimer) {
            return;
        }
        fn();
        // @ts-ignore
        ThrottleDebounceUtil.throttleTimer = setTimeout(() => {
            // @ts-ignore
            clearTimeout(ThrottleDebounceUtil.throttleTimer);
            ThrottleDebounceUtil.throttleTimer = null;
        }, wait);
    }

}
