package com.amatta.amatta_server.gifticon.enums;

import com.amatta.amatta_server.gifticon.util.GifticonMapper;
import com.amatta.amatta_server.gifticon.util.KakaoGifticonMapper;

import java.util.List;
import java.util.regex.Pattern;

public enum GifticonMapperEnum {
    KAKAO(KakaoGifticonMapper.getInstance()) {
        @Override
        public boolean matches(List<String> texts) {
            Pattern pattern = Pattern.compile("(?i)kakaotalk");
            for(String text : texts) {
                if(pattern.matcher(text).matches()) {
                    return true;
                }
            }
            return false;
        }
    };

    GifticonMapperEnum(GifticonMapper gifticonMapper) {
        this.gifticonMapper = gifticonMapper;
    }

    private final GifticonMapper gifticonMapper;

    public GifticonMapper getGifticonMapper() {
        return this.gifticonMapper;
    }

    public abstract boolean matches(List<String> texts);
}
