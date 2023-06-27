# CN-Web-Backend

### các request (trừ đăng nhập, đăng xuất) có headers là token

```
const res = await axios.get('http://localhost:8086/users/get-post?id=all', {
      headers: { token: `Bearer ${accessToken}` },
});

```

#### Up image ở các request cần ảnh (bắt buộc)

```
const newPlace = new FormData();
newPlace.append('name', name);
// các req.body khác tương tự
newPlace.append('image', image);

// call api
addPlace(token, dispatch, newPlace)
```

```
<input type='file' required={true} onChange={e => setImage(e.target.files[0])} />
```

#### Các endpoint:

##### post

###### /users/add-post : thêm bài viết (body gồm user_id, title, content, short_description, full description, topic và image)

###### /users/get-post?id= : lấy bài viết theo id, nếu id=all hoặc ALL thì lấy tất cả bài viết

###### /users/delete-post?id= : xóa bài viết theo id

###### /users/update-post?id= : chỉnh sửa bài viết

###### /users/react-post : (method put) like/dislike bài viết (body gồm post_id và action (action='like' hoặc 'dislike'))

###### /admin/handle-post?id=: (method put) body gồm status ('true' hoặc 'false')

##### QAS

###### /users/add-qas: thêm câu hỏi (body gồm question, user_id)

###### /users/get-question?id= : lấy câu hỏi theo id, nếu id=all hoặc ALL thì lấy tất cả qas

###### /admin/ans-qas?id= : trả lời câu hỏi (body gồm answer)

###### /admin/delete-qas?id= : xóa câu hỏi

##### comment

###### /users/add-comment: thêm cmt (body gồm user_id, post_id, content)

###### /users/get-comment?id= : lấy danh sách comment theo id của post

###### /users/delete-comment?id= : xóa cmt

###### /users/edit-comment?id= : chỉnh sửa comment

##### rate

###### /users/add-rate: đánh giá tour (body gồm user_id, tour_id, service_rate, location_rate, price_rate, infrastructure_rate)

###### /users/get-rate?idTour= : lấy danh sách đánh giá của 1 tour và hiển thị điểm của tour

###### /users/delete-rate?idTour=?idUser= : xóa rate

###### /users/edit-rate?idTour=?idUser= : chỉnh sửa rate

##### user

###### /auth/register : đăng ký (body gồm name, email, password)

###### /auth/login : đăng nhập (body gồm email, password)

###### /users/get-user?id= : lấy thông tin người dùng

###### /users/update-user : cập nhật thông tin người dùng

###### /auth/change-pass?id= (method put) : thay đổi mật khẩu theo id user (body gồm old_pass, new_pass, confirm_pass)

##### type

###### /admin/add-type: thêm loại cho tour (body gồm name)

###### /admin/get-type?id= : lấy thông tin về type đó theo id, nếu id=all thì lấy tất cả type

###### /admin/edit-typr?id= : cập nhật type

##### place

###### /admin/add-place : thêm điểm đến (body gồm name, description, image)

###### /admin/get-place?id= : lấy thông tin về điểm đến, id = all thì lấy danh sách place

###### /admin/edit-place?id= : cập nhật place

##### voucher

###### /admin/add-voucher : thêm voucher (body gồm name, discount)

###### /admin/get-voucher?id= : lấy thông tin voucher, id=all lấy danh sách voucher

###### /admin/edit-voucher?id= : cập nhật voucher

###### /admin/disable-voucher?id= : hủy voucher (method put)

##### service

###### /admin/add-service : thêm dịch vụ (body gồm name, description)

###### /admin/get-service?id= : lấy ttin dịch vụ, id = all thì lấy ds dịch vụ

###### /admin/edit-service?id= : cập nhật dịch vụ

##### tour

###### /admin/add-tour: thêm tour (body gồm type_id, name, overview, highlight, start_date, duration, slots, price, status ,booking_deadline ,placeId ,serviceId, voucherId, arrivalId1, arrivalId2, arrivalId3, image)

###### /admin/get-tour?id= : lấy thông tin tour, id = all lấy ds tour

###### /admin/delete-tour?id= : xóa tour

###### /admin/edit-tour?id= : cập nhật tour

#### Các api get book tour/get fav tour trả về id của tour đấy, gọi thêm api get tour để lấy thông tin chi tiết

##### book tour

###### /users/book-tour : người dùng đặt tour (body gồm user_id, tour_id, arrival_day, arrival_time, price, num_people)

###### /users/cancel-book-tour?id= : hủy đặt tour theo id của booking (method delete)

###### /users/get-book-tour?id= : lấy thông tin tour được book theo id của người dùng

###### /admin/get-all-booking : lấy thông tin các booking (hiện cả thông tin của tour và người dùng trong 1 object {tour: {...}, user: {...}})

##### favorite tour

###### /users/add-fav-tour : thêm tour yêu thích (body gồm user_id, tour_id)

###### /users/get-fav-tour?idUser= : lấy danh sách tour yêu thích

###### /users/delete-fav-tour?idTour=?idUser= : xóa tour yêu thích
