-- Thêm góc nhìn "Quan điểm nuôi dạy con" của chị Vân vào kho kiến thức
-- Chạy trong Supabase > SQL Editor (project paaphwfpoiiowmthxtlp)
insert into knowledge_angles (client_slug, angle_code, source_type, source_name, category, hook_title, core_insight, soft_sell_prompt, used_count)
select 'khanh-van', 'kv-42-nuoi-day-con-theo-dam-me-va-the-manh', 'personal_story', 'Quan điểm nuôi dạy con của Khánh Vân', 'Gia đình & Giáo dục',
       'Nuôi con không phải để con đi đúng con đường cha mẹ vẽ sẵn, mà để con tìm ra thế mạnh của chính mình',
       'Vân có hai con: Minh Châu đang học lớp 7 và bé út học lớp 1. Cách Vân nuôi dạy con là đồng hành thay vì áp đặt. Các con vẫn được kèm cặp sát sao, rèn nề nếp và kỷ luật hằng ngày, nhưng được tự do phát triển theo đam mê và sở thích riêng. Vai trò của cha mẹ là quan sát, cùng con tìm ra ưu thế của mình, rồi tiếp sức để con phát huy tối đa trên con đường ấy. Vân tin rằng một đứa trẻ được làm điều mình yêu thích, có nền tảng kỷ luật vững, sẽ đi xa và bền hơn một đứa trẻ bị ép theo khuôn mẫu.',
       'Ở cuối bài, liên hệ nhẹ nhàng: muốn để con tự do chọn đam mê thì cha mẹ cần chuẩn bị một quỹ học vấn đủ linh hoạt — không gò con vào một ngành, một trường cố định, mà sẵn sàng tiếp sức cho bất kỳ hướng đi nào con chọn. Không nhắc tên sản phẩm cụ thể.', 0
where not exists (select 1 from knowledge_angles where angle_code = 'kv-42-nuoi-day-con-theo-dam-me-va-the-manh');
